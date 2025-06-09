using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models.Classes
{
    public class User
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        [Required]
        public string Name { get; set; }

        [BsonElement("phone")]
        [Required]
        public string Phone { get; set; }
    }
}
