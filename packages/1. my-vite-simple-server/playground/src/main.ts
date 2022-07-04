// @ts-ignore 必须要用后置，因为 server 没做自动加后缀的兼容
import { subModule } from './sub-module.ts';
// @ts-ignore
import { ReactComponent } from './react-component.tsx';
import './style.css';

const app = document.getElementById('app');
app!.innerText = 'Hello World';

subModule(app!);
const comp = ReactComponent();
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(comp);
