const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId
const MongoError = require("mongodb").MongoError
databaseInsert()
async function databaseInsert(){
const host = "mongodb://localhost:27017/"
const client =await MongoClient.connect(host, { useNewUrlParser: true })
const database = client.db("CIT_DB")
var coustomizeJson={}
var templateJson={
   "AWSTemplateFormatVersion" : "2010-09-09",

  "Description" : "AWS CloudFormation Template for creating EC2 instance with node js and install git,  clone the given git url and install dependencies, additionally install the pm2 package for running node server as a service.",

  "Parameters" : {
    "KeyName": {
      "Description" : "Name of an existing EC2 KeyPair to enable SSH access to the instances",
      "Type": "String",
      "Default":"test2",
      "ConstraintDescription" : "must be the name of an existing EC2 KeyPair."
    },
     "SSHLocation": {
      "Description": "The IP address range that can be used to SSH to the EC2 instances",
      "Type": "String",
      "MinLength": "9",
      "MaxLength": "18",
      "Default": "0.0.0.0/0",
      "AllowedPattern": "(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})/(\\d{1,2})",
      "ConstraintDescription": "must be a valid IP CIDR range of the form x.x.x.x/x."
    },
    "InstanceType" : {
      "Description" : "WebServer EC2 instance type",
      "Type" : "String",
      "Default" : "t2.micro",
      "AllowedValues" : [ "t1.micro", "t2.nano", "t2.micro", "t2.small"],
      "ConstraintDescription" : "must be a valid EC2 instance type."
    },
    "GitUrl":{
      "Type":"String",
      "Default":"",
      "ConstraintDescription" : "Git url to download repositories"
    },
    "RepoName":{
      "Type":"String",
      "Default":"",
      "ConstraintDescription" : "Git Repo name for point the directory"
    }
  },
  "Resources":{
    "WebServerSecurityGroup" : {
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Enable HTTP access via port 80 locked down to the load balancer + SSH access",
        "SecurityGroupIngress" : [
          {"IpProtocol" : "tcp", "FromPort" : "80", "ToPort" : "80", "CidrIp" : "0.0.0.0/0"},
          {"IpProtocol" : "tcp", "FromPort" : "22", "ToPort" : "22", "CidrIp" : { "Ref" : "SSHLocation"}}
        ]
      }
    },
    "NodeJsInstance": {
    "Type": "AWS::EC2::Instance",
    "Properties": {
        "KeyName": {"Ref":"KeyName"},
        "ImageId": "ami-03cfb5e1fb4fac428",
        "InstanceType": "t2.micro",
        "SecurityGroups" : [ {"Ref" : "WebServerSecurityGroup"} ],
        "UserData": {
          "Fn::Base64": { "Fn::Join" : ["", [
          "#!/bin/bash -xe\n",
          "sudo -i\n",
          "sudo yum install -y gcc-c++ make\n",
          "curl -sL https://rpm.nodesource.com/setup_12.x | sudo -E bash -\n",
          "sudo yum install nodejs -y\n",
          "sudo yum install git -y\n",
          "git clone ",{"Ref":"GitUrl"},"\n",
          "cd ",{"Ref":"RepoName"},"\n",
          "npm i\n",
          "npm i pm2 -g\n",
          "pm2 start server.js\n"
        ]]}},
        "Tags": [
          {
              "Key": "Name",
              "Value": "EC2-nodejs"
          }
        ]
    }
  }
  },
  "Outputs":{
 "URL" : {
      "Description" : "The URL of the website",
      "Value" :  { "Fn::Join" : [ "", [ "http://", { "Fn::GetAtt" : [
          "NodeJsInstance", "PublicIp" ]}]]}
    }
  }
}

var Json={
  name:"Nodejs",
  isGithubReq:true,
  isCustomizable:false,
  customizeOption:JSON.stringify(coustomizeJson),
  template:JSON.stringify(templateJson)
}
console.log(Json);
  const { modifiedCount }= await database.collection("cfttemplates").insertOne(Json)
  console.log(modifiedCount);
}
