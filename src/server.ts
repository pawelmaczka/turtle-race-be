import app from './app';

app.listen(app.get('port'), () => {
  console.log('Application is running at port', app.get('port'));
});
