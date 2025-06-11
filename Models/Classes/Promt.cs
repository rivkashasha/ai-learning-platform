using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Interfaces;

namespace Models.Classes
{
    public class Prompt: IEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("userId")]
        [Required]
        public ObjectId UserId { get; set; }

        [BsonElement("categoryId")]
        [Required]
        public ObjectId CategoryId { get; set; }

        [BsonElement("subCategoryId")]
        [Required]
        public ObjectId SubCategoryId { get; set; }

        [BsonElement("prompt")]
        [Required]
        public string? PromptText { get; set; }

        [BsonElement("response")]
        [Required]
        public string Response { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
