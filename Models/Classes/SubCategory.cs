using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using Models.Interfaces;


namespace Models.Classes
{
    public class SubCategory: IEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        [Required]
        public string Name { get; set; }

        [BsonElement("categoryId")]
        [Required]
        public ObjectId CategoryId { get; set; }
    }
}
