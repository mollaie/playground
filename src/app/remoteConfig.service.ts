import { Injectable, signal } from "@angular/core";
import { FirebaseRemoteConfig } from '@capacitor-firebase/remote-config';

export interface appSetting{
    title:string,
    version:number
}
@Injectable({
    providedIn:'root'
})
export class RemoteConfigService{

    public appSetting = signal<appSetting>({
        title:"default",
        version:0
    });

   async active(){
    await FirebaseRemoteConfig.fetchAndActivate();

   }

   async fetchConfig(){
    await  await FirebaseRemoteConfig.fetchConfig({
        minimumFetchIntervalInSeconds: 1,
      });
   }

   async getBoolean(){
    const { value } = await FirebaseRemoteConfig.getBoolean({
        key: 'is_sale',
      });
      return value;
   }

   async getNumber(){
    const { value } = await FirebaseRemoteConfig.getNumber({
        key: 'app_version_number',
      });
      return value;
   }

   async getString(){
    const { value } = await FirebaseRemoteConfig.getString({
        key: 'app_title',
      });
      return value;
   }

   
}