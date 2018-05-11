export class UrlResponse{
    
    url_Title : string;
    url_Image : string;
    url_Domain : string;

}


// refreshNote(): void {
// this.noteService.getAllNotes().subscribe(data => {
// this.notes = data.body.map(noteObj =>{
// console.log(noteObj);
// if(this.urlify(noteObj.description))
// noteObj.urlPromise = this.getScrapData(noteObj.description).map(res=>{
// return res.body;
// });
// return noteObj;
// })
// });
// }


// getScrapData(description : string): Observable<any> {
// let url = this.urlify(description);
// if(!url)
// {
// let subjectObj = new Subject<any>();
// return subjectObj.asObservable();
// } 
// return this.noteService.getUrlData(url)}

// urlify(text) :Array<string> {
// var urlRegex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
// return text.match(urlRegex);
// }