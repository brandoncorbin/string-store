//@flow

/**
 * Class TinyConfig
 */
class TinyConfig {
  data:any;

  constructor(starterObj:any) {
    if(starterObj && typeof starterObj == 'object') {
      this.data = starterObj;
    } else if(typeof starterObj == "string") {
      this.parse(starterObj);
    } else {
      this.data = {};
    }
  }

  /**
   * Parse a token
   * this is used to convert false and true strings into real booleans
   * as well as numbers
   * @param  {string} token String to check
   * @return {any}       Whatever it is
   */
  _parseToken(token:string):any {
    let res = token;
    let numCheck = parseFloat(token);
    switch(res) {
      case 'true' :
        res = true;
      break;
      case 'false' :
        res = false;
      break;
      case '0' :
        res = 0;
      break;
    }
    if(!isNaN(numCheck)) {
      res = numCheck;
    }
    return res;
  };

  /**
   * Parse a String
   * @param  {string} configString The string name=bob&age=123
   * @return {Object}              Returns the TinyConfig data structure
   */
  parse(configString:String):any {
    this.data = {};
    if(configString) {
        var units = configString.split('&');
        units.forEach((unit)=>{
            let unitSplit = unit.split('=');
            if(unitSplit.length == 2) {
                if(unitSplit[1]!='null') {
                  let value = this._parseToken(decodeURIComponent(unitSplit[1]));
                  this.data[unitSplit[0]]=value;
                }
            }
        });
    }
    return this.data;
  }

  /**
   * Get a value from the data
   * @param  {string} key       key name
   * @param  {any} defaulter default value to return if non eixsts
   * @return {any}           whatever the value is
   */
  get(key:String, defaulter:any=null):any {
      if(this.data.hasOwnProperty(key)) {
          return this._parseToken(this.data[key]);
      } else {
          return defaulter || null;
      }
  }

  /**
   * Set a value
   * @param {string} key   Name of key
   * @param {any} value Value to store
   */
  set(key:string, value:any) {
      this.data[key]=value;
      return this;
  }

  /**
   * Remove a Key if it exists
   * @param  {string} key Name of key
   * @return {object}     This
   */
  remove(key:string) {
      if(this.data.hasOwnProperty(key)) {
        delete this.data[key];
      }
      return this;

  }

  /**
   * Get as an object
   * Returns the data from this.data
   * @return {any}     object
   */
  toObject():any  {
    return this.data;
  }

  /**
   * To String
   * Convert it back to a string
   * @return {string}        String formatted
   */
  toString():string {
    let theString = [];
    for(var d in this.data) {
      if(this.data[d]!=="null") {
        if(this.data[d] === true) {
          this.data[d] = "true";
        } else if(this.data[d] === false) {
          this.data[d] = "false";
        } else if(this.data[d] === "undefined") {
          this.data[d] = undefined;
        }
        if(typeof this.data[d] != "undefined") {
          theString.push(d + '=' + encodeURIComponent(this.data[d]));
        }
      }
    }
    return theString.join('&');
  }
}

module.exports = TinyConfig;
