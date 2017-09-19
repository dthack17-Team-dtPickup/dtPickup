import { FCM } from '@ionic-native/fcm';

constructor(private fcm: FCM) {}

fcm.getToken().then(token=>{
  backend.registerToken(token);
})

)

fcm.onTokenRefresh().subscribe(token=>{
  backend.registerToken(token);
})

