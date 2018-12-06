import { Component } from '@angular/core';
import { ToastController, IonicPage, LoadingController, NavController, Platform, AlertController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ApiProvider } from '../../providers/api/api';
import { AdMobPro } from '@ionic-native/admob-pro';
import moment from 'moment';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { AppVersion } from '@ionic-native/app-version';
import { HttpHeaders } from "@angular/common/http";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

declare var Clappr: any;
declare var LevelSelector: any;
declare var videojs: any;
declare var jwplayer: any;

@IonicPage()
@Component({
  selector: 'page-playerweb',
  templateUrl: 'playerweb.html',
})
export class PlayerwebPage {
  public listchannel = false;
  public channellist = [];
  public channelname: any;
  public id: any;
  public type: any;
  public name: any;
  public stream: any;
  public url: any;
  public urlembed: any;
  public xml: any;
  public channels = [];
  public loading: any;
  public video: any;
  public width: any;
  public height: any;
  public title: any;
  public thumbnail_picture: any;
  public quality: any;
  public channelall = [];
  public widthscreen: any;

  constructor(
    public navCtrl: NavController,
    private screenOrientation: ScreenOrientation,
    public api: ApiProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    public navParam: NavParams,
    public appVersion: AppVersion,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private youtube: YoutubeVideoPlayer,
    private androidFullScreen: AndroidFullScreen,
    private admob: AdMobPro) {
    this.loading = this.loadingCtrl.create({
      // cssClass: 'transparent',

    });
    this.loading.present().then(() => {
      this.widthscreen = window.screen.availWidth;
      this.id = this.navParam.get('id')
      this.type = this.navParam.get('type')
      this.name = this.navParam.get('name')
      this.stream = this.navParam.get('stream')
      this.url = this.navParam.get('url')
      this.title = this.navParam.get('title')
      this.thumbnail_picture = this.navParam.get('thumbnail_picture')
      this.width = platform.width();
      this.height = platform.height();
      this.api.get("table/z_channel_url", { params: { filter: "status='OPEN' AND name='" + this.name + "'", limit: 1000, sort: "title" + " ASC,quality ASC" } })
        .subscribe(val => {
          this.channelall = val['data']
        });
      if (this.type == 'TV') {
        if (this.stream != '') {
          document.getElementById('embed').style.display = 'none'
          jwplayer('myElement').setup({
            playlist: [{
              file: this.url,
              title: this.title,
              mediaid: '1'
            }],
            width: "100%",
            aspectratio: "16:9",
            stretching: "uniform",
            autostart: true,
            androidhls: true,
            displaydescription: true,
            displaytitle: true,
            visualplaylist: false,
            skin: { "active": "#DF2148", "inactive": "#CCCCCC", "name": "glow" },
            plugins: {
              "https://www.metube.id/cc-content/themes/default/js/ping.js": { "pixel": "http://content.jwplatform.com/ping.gif" }
            }
          });
          jwplayer('myElement').on('play', function () {
          });
          jwplayer('myElement').on('adError', function (error) {
            console.log(error);
          });
        }
        else {
          this.urlembed = this.navParam.get('url')
          document.getElementById('embed').style.display = 'block'
        }
        this.api.get("table/z_channel_url", { params: { filter: "status='OPEN' AND id_channel='" + this.id + "'", limit: 1000, sort: "id" + " ASC " } })
          .subscribe(val => {
            this.channels = val['data']
            this.stream = this.channels[0].stream
            this.url = this.channels[0].url
            this.title = this.channels[0].title
            this.quality = this.channels[0].quality
          });
      }
      else if (this.type == 'LIVE') {
        if (this.stream != '') {
          document.getElementById('embed').style.display = 'none'
          jwplayer('myElement').setup({
            playlist: [{
              file: this.url,
              title: this.title,
              mediaid: '1'
            }],
            width: "100%",
            aspectratio: "16:9",
            stretching: "uniform",
            autostart: true,
            androidhls: true,
            displaydescription: true,
            displaytitle: true,
            visualplaylist: false,
            skin: { "active": "#DF2148", "inactive": "#CCCCCC", "name": "glow" },
            plugins: {
              "https://www.metube.id/cc-content/themes/default/js/ping.js": { "pixel": "http://content.jwplatform.com/ping.gif" }
            }
          });
          jwplayer('myElement').on('play', function () {
          });
          jwplayer('myElement').on('adError', function (error) {
            console.log(error);
          });
        }
        else {
          this.urlembed = this.navParam.get('url')
          document.getElementById('embed').style.display = 'block'
        }
        this.api.get("table/z_channel_live_url", { params: { filter: "status='OPEN' AND id_channel='" + this.id + "'", limit: 1000, sort: "id" + " ASC " } })
          .subscribe(val => {
            this.channels = val['data']
            this.stream = this.channels[0].stream
            this.url = this.channels[0].url
            this.title = this.channels[0].title
            this.quality = this.channels[0].quality
          });
      }
    });
  }

  ngAfterViewInit() {
    this.loading.dismiss();
  }
  doChannelList() {
    this.doGetListChannel()
    this.listchannel = true;
    this.title = 'All Channels'
    this.quality = ''
  }
  doChannel() {
    this.listchannel = false;
  }
  doGetListChannel() {
    this.api.get("table/z_list_channel_web", { params: { filter: "status='OPEN'", limit: 100, sort: "name" + " ASC " } })
      .subscribe(val => {
        this.channellist = val['data']
      }, err => {
        this.doGetListChannel();
      });
  }
  doUpdateLink(channel) {
    var self = this;
    this.urlembed = ''
    this.stream = channel.stream
    this.url = channel.url
    this.title = channel.title
    this.quality = channel.quality
    if (channel.stream != '') {
      document.getElementById('embed').style.display = 'none'
      jwplayer('myElement').setup({
        playlist: [{
          file: channel.url,
          title: channel.title,
          mediaid: '1'
        }],
        width: "100%",
        aspectratio: "16:9",
        stretching: "uniform",
        autostart: true,
        androidhls: true,
        displaydescription: true,
        displaytitle: true,
        visualplaylist: false,
        skin: { "active": "#DF2148", "inactive": "#CCCCCC", "name": "glow" },
        plugins: {
          "https://www.metube.id/cc-content/themes/default/js/ping.js": { "pixel": "http://content.jwplatform.com/ping.gif" }
        }
      });
      jwplayer('myElement').on('play', function () {
      });
      jwplayer('myElement').on('adError', function (error) {

      });
    }
    else {
      this.stream = channel.stream
      this.urlembed = channel.url
      this.title = channel.title
      this.quality = channel.quality
      document.getElementById('embed').style.display = 'block'
      jwplayer('myElement').remove();
    }
  }
  doDetail(channel) {
    this.navCtrl.push('ChannelPage', {
      name: channel.name,
      category: channel.category,
      type: channel.type,
      stream: channel.stream
    })
  }
  doChangeChannel(all) {
    this.channels = [];
    if (all.type == 'TV') {
      this.api.get("table/z_channel_url", { params: { filter: "status='OPEN' AND id_channel='" + all.id_channel + "'", limit: 1000, sort: "id" + " ASC " } })
      .subscribe(val => {
        this.channels = val['data']
      });
    }
    else if (all.type == 'LIVE') {
      this.api.get("table/z_channel_live_url", { params: { filter: "status='OPEN' AND id_channel='" + all.id_channel + "'", limit: 1000, sort: "id" + " ASC " } })
      .subscribe(val => {
        this.channels = val['data']
      });
    }
    var self = this;
    this.urlembed = ''
    this.stream = all.stream
    this.url = all.url
    this.title = all.title
    this.quality = all.quality
    if (all.stream != '') {
      document.getElementById('embed').style.display = 'none'
      jwplayer('myElement').setup({
        playlist: [{
          file: all.url,
          title: all.title,
          mediaid: '1'
        }],
        width: "100%",
        aspectratio: "16:9",
        stretching: "uniform",
        autostart: true,
        androidhls: true,
        displaydescription: true,
        displaytitle: true,
        visualplaylist: false,
        skin: { "active": "#DF2148", "inactive": "#CCCCCC", "name": "glow" },
        plugins: {
          "https://www.metube.id/cc-content/themes/default/js/ping.js": { "pixel": "http://content.jwplatform.com/ping.gif" }
        }
      });
      jwplayer('myElement').on('play', function () {
      });
      jwplayer('myElement').on('adError', function (error) {

      });
    }
    else {
      this.stream = all.stream
      this.urlembed = all.url
      this.title = all.title
      this.quality = all.quality
      document.getElementById('embed').style.display = 'block'
      jwplayer('myElement').remove();
    }
  }

}
