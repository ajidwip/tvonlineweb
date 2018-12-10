import { ViewChild, Component } from '@angular/core';
import { AlertController, LoadingController, NavController, Events, MenuController, Platform, Nav, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpHeaders } from "@angular/common/http";
import { ApiProvider } from '../providers/api/api';
import { HomePage } from '../pages/home/home';
import moment from 'moment';
import { AppVersion } from '@ionic-native/app-version';

declare var window: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') Nav: NavController;
  rootPage: any = HomePage;
  public loader: any;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public events: Events,
    public app: App,
    public api: ApiProvider,
    public appVersion: AppVersion,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.loader = this.loadingCtrl.create({

    });
    this.initializeApp();
    this.loader.present().then(() => {
      if (window.devtools.open) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.tvonline.omegastreaming';
      }
      // console.log('is DevTools open?', window.devtools.open);
      // console.log('and DevTools orientation?', window.devtools.orientation);
      window.addEventListener('devtoolschange', function (e) {
        if (e.detail.open) {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.tvonline.omegastreaming';
        }
        // alert(e.detail.open)
        // console.log('is DevTools open?', e.detail.open);
        // console.log('and DevTools orientation?', e.detail.orientation);
      });
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      setInterval(() => {
        console.clear()
      }, 1000);
    });
  }
  ngAfterViewInit() {
    this.loader.dismiss()
  }
}

