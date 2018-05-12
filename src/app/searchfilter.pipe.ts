import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

transform(items: any, searchText: string): any {
if (!searchText || !items) return items;

return SearchfilterPipe.filter(items, searchText);
}

static filter(items: Array<{ [key: string]: any }>, searchText: string): Array<{ [key: string]: any }> {

const toCompare = searchText.toLowerCase();

return items.filter(function (item: any) {
for (let property in item) {
if (item[property] === null) {
continue;
}
if (item[property].toString().toLowerCase().includes(toCompare)) {
return true;
}
}
return false;
});
}
}
