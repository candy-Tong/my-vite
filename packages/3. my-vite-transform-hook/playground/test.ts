import less from 'less';
async function start() {
  const css = await less.render(`
body{
  font-size: 100px
}
`);
  console.log(css);
}

start();
