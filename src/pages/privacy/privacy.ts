import { Component } from '@angular/core';
import { ToastController, IonicPage, LoadingController, NavController, Platform, AlertController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import moment from 'moment';
import { HttpHeaders } from "@angular/common/http";

declare var Clappr: any;
declare var LevelSelector: any;
declare var videojs: any;
declare var jwplayer: any;
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {
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
  public loader: any;

  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    public navParam: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
      this.loader = this.loadingCtrl.create({

      });
      this.loader.present().then(() => {
      });
      this.width = window.screen.availWidth;
      this.height = window.screen.availHeight;
  }
  ngAfterViewInit() {
    this.loader.dismiss()
  }
  doDetail(channel) {
    this.navCtrl.push('ChannelPage', {
      name: channel.name,
      category: channel.category,
      type: channel.type,
      stream: channel.stream
    })
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
    this.api.get("table/z_list_channel", { params: { filter: "status='OPEN'", limit: 100, sort: "name" + " ASC " } })
      .subscribe(val => {
        this.channellist = val['data']
      }, err => {
        this.doGetListChannel();
      });
  }

}
