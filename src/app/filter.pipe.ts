import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'notePipe'
})

export class Filter implements PipeTransform {

    transform(notes: Array<any>, option?: any): any {
        if (!notes) return [];

        return notes.filter(noteObj => {

            var check = true;
            if (option) {
                for (var index in option) {
                    if (noteObj[index] != option[index]) {
                        check = false;
                        break;
                    }
                }
                return check;
            }
            return check;
        });
    }
}/*  */
    