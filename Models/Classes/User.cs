using System.ComponentModel.DataAnnotations;
using Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models.Classes
{
    public class User: IEntity
    {
        [BsonId]
        
        public ObjectId Id { get; set; }

        [BsonElement("customId")]
        [Required]
        public string CustomId { get; set; }

        [BsonElement("name")]
        [Required]
        public string Name { get; set; }

        [BsonElement("phone")]
        [Required]
        public string Phone { get; set; }
    }
}
