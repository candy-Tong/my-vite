// @ts-ignore 必须要用后置，因为 server 没做自动加后缀的兼容
import { subModule } from './sub-module.ts';
import './style.css';

const app = document.getElementById('app');
app!.innerText = 'Hello World';

subModule(app!);
