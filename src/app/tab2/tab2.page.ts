import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, Renderer2, ElementRef } from '@angular/core';
import { query, limit, Firestore, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue, collectionData, collectionGroup, collection, getDoc, getDocs, doc, startAt, startAfter } from '@angular/fire/firestore';
import { FirebaseAnalytics } from '@capacitor-firebase/analytics';
import { InfiniteScrollCustomEvent, IonicModule, Platform } from '@ionic/angular';


export interface icategory {
  title: string, description: string, imageUrl: string
}

class category {
  constructor(readonly title: string, readonly description: string, readonly imageUrl: string) { }
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],

})
export class Tab2Page implements OnInit {
  items: icategory[] = [];
  firestore: Firestore = inject(Firestore);
  renderer:Renderer2 = inject(Renderer2);
  el:ElementRef = inject(ElementRef);
  lastDoc:any;
  isloading:boolean = true;

  constructor(private platform: Platform) { }

 async ionViewDidEnter(){
    this.isloading = true;
    this.items = [];

    const categoryConverter = {
      toFirestore(cat: WithFieldValue<category>): icategory {
        return { title: cat.title.toString(), description: cat.description.toString(), imageUrl: cat.imageUrl.toString() };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): category {
        const data = snapshot.data(options) as icategory;
        return new category(data.title, data.description, data.imageUrl);
      }
    };

    const itemCollection = collection(this.firestore, 'category',).withConverter(categoryConverter);
    const appQuery = query(itemCollection, limit(50));
    const docs = (await getDocs(appQuery)).docs;
    this.lastDoc = docs[docs.length -1];

    const results = docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }).map((item)=> {
      return <icategory>{
        title:item.title,
        description:item.description,
        imageUrl:item.imageUrl
      }
    });
    
    this.items.push(...results);
    setTimeout(() => {
      
      this.isloading = false;
    }, 500);
  }

  async ngOnInit() {
    this.isloading = true;
    this.items = [];
    if (!this.platform.is('desktop')) {
      await FirebaseAnalytics.setCurrentScreen({
        screenName: 'Tab 2 Page',
        screenClassOverride: 'Tab2Page',
      });

    }
   
  }


  async onIonInfinite(ev: unknown) {
    const categoryConverter = {
      toFirestore(cat: WithFieldValue<category>): icategory {
        return { title: cat.title.toString(), description: cat.description.toString(), imageUrl: cat.imageUrl.toString() };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): category {
        const data = snapshot.data(options) as icategory;
        return new category(data.title, data.description, data.imageUrl);
      }
    };

    const itemCollection = collection(this.firestore, 'category',).withConverter(categoryConverter);
    const appQuery = query(itemCollection,startAfter(this.lastDoc), limit(50));
    const docs = (await getDocs(appQuery)).docs;
    this.lastDoc = docs[docs.length -1];

    console.log(this.lastDoc)

    const results = docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }).map((item)=> {
      return <icategory>{
        title:item.title,
        description:item.description,
        imageUrl:item.imageUrl
      }
    });
    
    this.items.push(...results);

    (ev as InfiniteScrollCustomEvent).target.complete();
  }


  likedMap: { [key: number]: boolean } = {};
  showSplash: { [key: number]: boolean } = {};

  toggleLike(index: number) {
     // Toggle like status
     this.likedMap[index] = !this.likedMap[index];

     // Show splash effect
     this.showSplash[index] = true;
 
     // Remove splash effect after animation duration (500ms)
     setTimeout(() => {
       this.showSplash[index] = false;
     }, 500);
  }

}
