import { Pipe, PipeTransform } from '@angular/core';
import { ref, getStorage, listAll, getDownloadURL } from 'firebase/storage';

@Pipe({
  name: 'mediaUrl',
})
export class MediaUrlPipe implements PipeTransform {
  transform(id: string) {
    const storage = getStorage();
    const storageRef = ref(storage, id);
    let urls = [];

    listAll(storageRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(ref(storage, item.fullPath)).then((url) => {
          urls.push(url);
        });
      });
    });

    return urls;
  }
}
