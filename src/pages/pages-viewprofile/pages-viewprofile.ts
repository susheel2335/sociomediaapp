import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{PostProvider} from '../../providers/post/post';
import { ToastController,App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import{AuthenticationProvider} from '../../providers/authentication/authentication';
import{MyApp} from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-pages-viewprofile',
  templateUrl: 'pages-viewprofile.html',
})
export class PagesViewprofilePage {

  post:any;
  comments:any=[];

 
  dispcomment:any='';
  comment;
  errcomment:any='';
  user;
  likecount:any=[];
  username:any='';
 
  likes:any='';
  userid:any='';
  liketoggle=[];
  thispost:any='';
  showcommenttoggle1:any=[];
  constructor(public navCtrl: NavController,public app:App,public auth:AuthenticationProvider,private menu: MenuController,public toastController: ToastController, public navParams: NavParams,public postserv:PostProvider) {
    this.user=JSON.parse(localStorage.getItem('currentUser'));
  }
  menutoggle () {
    this.menu.enable(false, 'home');
    this.menu.enable(false, 'addpost');
    this.menu.enable(true, 'myprofile');
    this.menu.toggle('myprofile');
}
ngOnInit(){
  for(const i of this.user){
    this.username=i.username;
    this.userid=i._id;

  }
this.getmypost(this.userid);
this.getcomment();
}
ionViewWillEnter() {
  this.getmypost(this.userid);
  this.getcomment();
  
}
addlikes(j,uid,pid){
  console.log('Hii');
  this.postserv.getthispost(pid).subscribe(data=>{
    this.thispost=data;
  for(let p of this.thispost){
    this.likecount[j]=p.likes;
  }
  

      this.liketoggle[j]=!this.liketoggle[j];
      
      if(this.liketoggle[j]){
        console.log(this.likecount[j]+1);
        this.likecount[j]=this.likecount[j]+1;
        let body={
          _id:pid,
    
          likes:this.likecount[j]
        };
        this.postserv.updatepost(body).subscribe(data=>{this.getmypost(this.userid);});
        
      } 
      else{
        if(this.likecount[j]>0){
          console.log(this.likecount[j]-1);
          this.likecount[j]=this.likecount[j]-1;
          let body={
            _id:pid,
            userid:this.post.userid,
            username:this.post.username,
            post:this.post.post,
            likes:this.likecount[j]
          };
          this.postserv.updatepost(body).subscribe(data=>{this.getmypost(this.userid);});
        }
        
      }
      

  });
  
}
getmypost(userid){
  this.postserv.getmypost(userid).subscribe(data=>{
    this.post=data;
  })

}
getcomment(){
  this.postserv.getcomment().subscribe(data=>{
    if(data){
      this.dispcomment=data;
    }
  
  });

}
addcomment(id,userid,j,username){

  this.postserv.addcomment(userid,id,username,this.comments[j]).subscribe(data=>{
    console.log('Added Successfully');
    this.getcomment();
    this.presentToast();
  });
  this.comments[j]='';
}
// gotoprofile(id){
//   this.route.navigateByUrl('/viewprofile/'+id);
  
// }

deletepost(id){
  this.postserv.deletepost(id).subscribe(data=>{
    this.getmypost(this.userid);
  });

}
deletecomment(id){
  this.postserv.deletecomment(id).subscribe(data=>{
    this.getcomment();
  });

}
showcommenttoggle(j){
  this.showcommenttoggle1[j]=!this.showcommenttoggle1[j];
 
}
async presentToast() {
  const toast = await this.toastController.create({
    message: 'Comment Added Successfully',
    duration: 2000,
    position:'top'
  });
  toast.present();
}
logout(){
  this.auth.logout();
  this.app.getRootNav().setRoot(MyApp);
}
}