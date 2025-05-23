import { BSON, Realm } from "realm";

// Define your object model
export class Task extends Realm.Object<Task> {
  _id!: BSON.ObjectId;
  description!: string;
  isComplete: boolean = false;
  createdAt: Date = new Date();

  position: Realm.Types.Int = 0;

  user_id!: string;

  static schema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      isComplete: { type: "bool", default: false },
      createdAt: "date",
      position: "int",
      user_id: "string",
    },
  };
}

// Define your object model
// export class Task extends Realm.Object<Task> {
//   _id: BSON.ObjectId = new BSON.ObjectId();
//   description!: string;
//   isComplete: boolean = false;
//   createdAt: Date = new Date();

//   position: Realm.Types.Int = 0;

//   user_id!: string;

//   static primaryKey = "_id";
// }
