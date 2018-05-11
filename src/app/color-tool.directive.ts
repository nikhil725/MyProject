import { Directive, ElementRef, Input, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap,NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/pairwise';
import { filter, map } from 'rxjs/operators';
@Directive({
selector: '[appColorTool]'
})
export class ColorToolDirective {

constructor(
private activatedroute: ActivatedRoute,
private router: Router,
private elRef: ElementRef) { }

ngOnInit(): void {
console.log("from color directive check->>", this.router.url)

 this.router.events.pipe(
 filter(event => event instanceof NavigationEnd)
 ).subscribe(({url}: any) => {
 console.log(url);
 this.changeColor(url);
 });
}
changeColor(url: string) {


if (url.indexOf("note")>-1) {
this.elRef.nativeElement.style['background-color'] = 'skyblue';
}
else if (url.indexOf("archive")>-1) {
this.elRef.nativeElement.style['background-color'] = 'MediumSlateBlue ';
}
else if(url.indexOf("reminder")>-1){
this.elRef.nativeElement.style['background-color'] = 'pink';
}
else if(url.indexOf("trash")>-1){
this.elRef.nativeElement.style['background-color'] = 'RosyBrown';
}
}

}




// @Directive({
// selector: '[appColorTool]'
// })
// export class ColorToolDirective implements OnInit {

// constructor(
// private activatedroute: ActivatedRoute,
// private router: Router,
// private elRef: ElementRef) { }
// ngOnInit(): void {
// console.log('from color directive check->>', this.router.url);

// this.router.events.pipe(
// filter(event => event instanceof NavigationEnd)
// ).subscribe(({url}: any) => {
// console.log(url);
// this.changeColor(url);
// });

// }
// changeColor(url: string) {


// if (url.indexOf('notes') > -1) {
// this.elRef.nativeElement.style['background-color'] = 'yellow';
// } else if (url.indexOf('archive') > -1) {
// this.elRef.nativeElement.style['background-color'] = 'MediumSlateBlue ';
// } else if (url.indexOf('reminder') > -1) {
// this.elRef.nativeElement.style['background-color'] = 'pink';
// } else if (url.indexOf('trash') > -1) {
// this.elRef.nativeElement.style['background-color'] = 'RosyBrown';
// }
// }

// }