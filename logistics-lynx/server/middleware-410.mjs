export function portal410(req, res, next){
  const retired = ["/carrier-admin","/broker-admin","/shipper-admin","/carrier-dispatch"];
  if (retired.includes(req.url)) {
    res.statusCode = 410;
    res.setHeader("Content-Type","application/json");
    res.setHeader("X-Portal-Status","decommissioned");
    const map = {
      "/carrier-admin": "/carrier",
      "/broker-admin": "/broker",
      "/shipper-admin": "/shipper",
      "/carrier-dispatch": "/load-board"
    };
    res.end(JSON.stringify({error:"gone", use: map[req.url]}));
    return;
  }
  next();
}
