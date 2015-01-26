var FaceS = function(options){

    this.language = options.language;
    this.templatePath = "/langs";

    this.angular = angular.module(options.ngApp, ['ngRoute']);

};

FaceS.availableLanguages = ["fr","en"];

FaceS.hasSession = function(){
    return $.cookie("zep-session") == 1;
};

FaceS.startSession = function() {
    return $.cookie("zep-session",1);
};

FaceS.detectLanguage = function(){


    var browserLanguage = window.navigator.userLanguage || window.navigator.language;
    browserLanguage = browserLanguage.split("-")[0];

    if(FaceS.availableLanguages.indexOf(browserLanguage) >= 0){
        return browserLanguage;
    }

    return "en";

};

FaceS.prototype = {

    getTemplate : function(name){

        return this.templatePath + "/" + this.language + "/" + name;

    }

};