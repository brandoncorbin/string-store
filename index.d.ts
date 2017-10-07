declare class StringStore {
	constructor(starter?:any);
	data:any;
	parse(config:string):any;
	get(key:string, defaultVal?:any):any;
	set(key:string, value:any):this;
	remove(key:string):this;
	toString():String;
	toObject():any;
}
export = StringStore;
