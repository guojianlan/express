

var path = require('path')
class ResumeView {
  constructor() {
    this.template = this.template.bind(this);
    this.downTemplate = this.downTemplate.bind(this);
  }
  async template(req, res, next) {
    //首先要生成pdf,传个id和哪个模板，之后要上传到qinniu
    //  wkhtmltopdf('http://127.0.0.1:3001/ceshiPage', {pageSize: 'letter',output:'uploads/out4.pdf' },function(code, signal){
    //   res.send(utils.resSuccessCode());
    // });
    return res.render(path.join(__dirname,'../../public','template/viewer.html'),{
      cvUrl:'/uploads/out4.pdf'
    });
  }
  async downTemplate(req,res,next){
    return res.download(path.join(__dirname,'../../uploads','out4.pdf'));
  }
}

export default new ResumeView();