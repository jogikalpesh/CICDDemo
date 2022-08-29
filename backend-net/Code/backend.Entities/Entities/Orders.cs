using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Entities.Entities
{
    [BsonIgnoreExtraElements]
    public class Orders
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id  { get; set; }
        public int orderid  { get; set; }
        public string description  { get; set; }
        
    }

}
