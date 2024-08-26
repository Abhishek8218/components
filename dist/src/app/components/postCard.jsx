var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
var InfoCard = function (_a) {
    var userId = _a.userId, id = _a.id, title = _a.title, body = _a.body, innerRef = _a.innerRef, props = __rest(_a, ["userId", "id", "title", "body", "innerRef"]);
    return (<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">User ID: {userId}</div>
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Post ID: {id}</div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title}</h1>
          <p className="mt-2 text-gray-500">{body}</p>
        </div>
      </div>
    </div>);
};
export default InfoCard;
