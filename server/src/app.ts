//const express = require("express");

import express, {Express, Request, Response, NextFunction } from "express"
const app:Express = express();

app.all("*", (req:Request, res:Response, next:NextFunction) => {
  res.send("test");
});

export default app;