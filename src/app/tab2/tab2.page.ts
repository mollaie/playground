import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue, collection, collectionData } from '@angular/fire/firestore';
import { FirebaseAnalytics } from '@capacitor-firebase/analytics';
import { InfiniteScrollCustomEvent, IonicModule, Platform } from '@ionic/angular';
import { Observable, map } from 'rxjs';

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
  items: string[] = [];
  collections$!: Observable<category[]>;
  firestore: Firestore = inject(Firestore);

  constructor(private platform: Platform) { }
  async ngOnInit() {
    if (!this.platform.is('desktop')) {
      await FirebaseAnalytics.setCurrentScreen({
        screenName: 'Tab 2 Page',
        screenClassOverride: 'Tab2Page',
      });

    }
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

    const itemCollection = collection(this.firestore, 'category').withConverter(categoryConverter);
    this.collections$ = collectionData<category>(itemCollection);

  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: unknown) {
  }

}
