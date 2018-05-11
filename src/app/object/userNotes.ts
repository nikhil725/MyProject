import { UrlResponse } from './UrlResponse';
import { Observable } from 'rxjs';

export class UserNotes {

    noteId: number;
    title: string;
    description: string;
    trash: boolean;
    archive: boolean;
    pin: boolean;
    color: string;
    reminder: Date;
    labels: Array<LabelObject>;
    collaborators: Array<CollaboratorObject>;
    collaboratorName: string;
    Urls: UrlResponse[];
    urlPromise?: Observable<any>
    image: any[];
    imageString: string;
}

export class LabelObject {
    labelId: number;
    name: string;
}
export class CollaboratorObject {

    sharedUserId: User;
}

export class User {

    email: string;
}
