// importamos la funcion que vamos a testear
import { home } from '../src/pages/home';
import { loginEmailPassword } from '../src/lib/fnFirebase';
jest.mock('../src/lib/fnFirebase',() =>({loginEmailPassword:jest.fn(()=>Promise.resolve())}))
describe('myFunction', () => {
  it('debería ser una función', () => {
    document.body.innerHTML='<main id="root"></main>'
    home()
    const botonsignin=document.querySelector('btnSignIn')
    botonsignin.click()
    expect(loginEmailPassword).toHaveBeenCalledWith(expect.any(String), expect.any(String));
  });
});
