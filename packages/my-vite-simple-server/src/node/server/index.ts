import connect from 'connect';
import http from 'http';

export async function createServer(){
    const app = connect();
    app.use(function(_, res){
        res.end('Hello from Connect!\n');
    });
    http.createServer(app).listen(3000);
}
