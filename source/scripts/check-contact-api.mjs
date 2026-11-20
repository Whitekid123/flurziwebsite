import fs from 'node:fs';
import assert from 'node:assert/strict';
import {stripTypeScriptTypes} from 'node:module';
import {pathToFileURL} from 'node:url';
import path from 'node:path';

// Execute the actual handler with mocked provider transport; no email is sent.
let source = fs.readFileSync('app/api/contact/route.ts', 'utf8');
source = source.replace(/@\/lib\/([a-z-]+)/g, (_, file) => pathToFileURL(path.resolve('lib', file + '.ts')).href);
const {POST} = await import('data:text/javascript;base64,' + Buffer.from(stripTypeScriptTypes(source)).toString('base64'));
let passed = 0, calls = [];
const check = (value, label) => {assert.ok(value, label); passed++;};
const body = {name:'Test Person',email:'qa@example.com',organisation:'Local QA',topic:'Business enquiry',message:'Local test only.',token:'test-token',requestId:'3f74a4ab-0000-4000-a000-000000000001',website:''};
const request = (data=body, headers={}) => new Request('https://www.flurzi.com/api/contact', {method:'POST',headers:{origin:'https://www.flurzi.com','content-type':'application/json',...headers},body:typeof data==='string'?data:JSON.stringify(data)});
delete process.env.RESEND_API_KEY;
check((await POST(request())).status===503,'Missing configuration fails closed');
Object.assign(process.env,{RESEND_API_KEY:'test-secret',CONTACT_FROM:'Flurzi <test@example.com>',CONTACT_TO:'inbox@example.com',NEXT_PUBLIC_TURNSTILE_SITE_KEY:'test-site',TURNSTILE_SECRET_KEY:'test-secret',CONTACT_ALLOWED_ORIGINS:'https://www.flurzi.com'});
const mock = ({verified=true,hostname='www.flurzi.com',action='contact',providerStatus=200,providerBody={id:'test-email-id'}}={}) => {
  calls=[];
  globalThis.fetch=async(url,options)=>{calls.push({url,options});return new Response(JSON.stringify(String(url).includes('siteverify')?{success:verified,hostname,action}:providerBody),{status:String(url).includes('siteverify')?200:providerStatus});};
};
mock();
check((await POST(request(body,{origin:'https://attacker.example'}))).status===403,'Cross-origin submission rejected');
check(calls.length===0,'No provider calls on rejected origin');
check((await POST(request(body,{'content-type':'text/plain'}))).status===415,'Unsupported content type rejected');
check((await POST(request('{'))).status===400,'Malformed JSON rejected');
check((await POST(request('null'))).status===400,'Null input rejected');
check((await POST(request({...body,message:'x'.repeat(25000)}))).status===413,'Actual streamed body limited');
for(const invalid of [{name:''},{email:'bad'},{email:'a@example.com\r\nBcc: bad@example.com'},{topic:'Injected topic'},{message:''},{message:'x'.repeat(5001)},{website:'spam'},{token:''},{token:'x'.repeat(2049)},{requestId:'bad'}])check((await POST(request({...body,...invalid}))).status===400,'Invalid field '+Object.keys(invalid)[0]);
for(const options of [{verified:false},{hostname:'attacker.example'},{action:'login'}]){mock(options);check((await POST(request())).status===400,'Invalid challenge rejected');check(calls.length===1,'Challenge failure never sends email');}
mock({providerStatus:503});check((await POST(request())).status===502,'Provider rejection is not success');
mock({providerBody:{}});check((await POST(request())).status===502,'Missing delivery receipt is not success');
mock();const response=await POST(request());check(response.status===200,'Verified submission accepted');
const sent=JSON.parse(calls[1].options.body);check(sent.to[0]==='inbox@example.com'&&sent.from==='Flurzi <test@example.com>','Recipient and sender remain server-controlled');check(sent.reply_to==='qa@example.com','Reply-to uses validated visitor address');check(sent.text.includes('Local test only.')&&!sent.html,'Message sent as plain text');check(calls[1].options.headers['Idempotency-Key']==='contact-'+body.requestId,'Retry carries idempotency key');check(!(await response.text()).includes('test-secret'),'Credentials absent from response');
globalThis.fetch=async()=>{throw Error('test-secret provider error');};const failure=await POST(request());check(failure.status===502&&!(await failure.text()).includes('test-secret'),'Transport errors fail safely without leaking details');
console.log(JSON.stringify({passed,providerCalls:'mocked; no email sent'}));
