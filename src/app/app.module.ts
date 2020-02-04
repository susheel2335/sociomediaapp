import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { JwtModule } from '@auth0/angular-jwt';
import { PagesAddpostPage } from '../pages/addpost/pages-addpost';
import { PagesViewpostPage } from '../pages/pages-viewpost/pages-viewpost';
import { PagesLoginPage } from '../pages/pages-login/pages-login';
import { PagesViewprofilePage } from '../pages/pages-viewprofile/pages-viewprofile';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PostProvider } from '../providers/post/post';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { PagesChatPage } from '../pages/pages-chat/pages-chat';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ChatProvider } from '../providers/chat/chat';
import { PagesChatbubblePage } from '../pages/pages-chatbubble/pages-chatbubble';
import { PagesPersonalchatbubblePage } from '../pages/pages-personalchatbubble/pages-personalchatbubble';
const config: SocketIoConfig = { url: 'https://sociomediaapp-server.herokuapp.com', options: {} };
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PagesAddpostPage,
    PagesViewpostPage,
    PagesLoginPage,
    PagesViewprofilePage,
    PagesChatPage,
    PagesChatbubblePage,
    PagesPersonalchatbubblePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    SocketIoModule.forRoot(config),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('token');},
        whitelistedDomains: ['https://sociomediaapp-server.herokuapp.com'],
        blacklistedRoutes: ['https://sociomediaapp-server.herokuapp.com/api/user']
      }
    })],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PagesChatPage,
    PagesLoginPage,
    PagesAddpostPage,
    PagesViewprofilePage,
    PagesViewpostPage,
    PagesChatbubblePage,
    PagesPersonalchatbubblePage
  ],
  providers: [
    StatusBar,
    ChatProvider,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PostProvider,
    AuthenticationProvider

  ],
  exports: [PagesAddpostPage]
})
export class AppModule {}

