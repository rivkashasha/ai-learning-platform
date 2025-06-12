using MongoDB.Driver;
using Models.Classes;
using System;
using System.Collections.Generic;

public static class SeedData
{
    public static void SeedDatabase(IMongoDatabase database)
    {
        Console.WriteLine("Starting database seeding...");
        try
        {
            SeedCategories(database);
            SeedSubCategories(database);
            SeedUsers(database);
            SeedPrompts(database);

            Console.WriteLine("Database seeding completed.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Seeding error: {ex.Message}");
            throw;
        }
    }
    private static void SeedPrompts(IMongoDatabase database)
    {
        Console.WriteLine("Seeding prompts...");
        try
        {
            var promptCollection = database.GetCollection<Prompt>("prompts");
            if (promptCollection.CountDocuments(FilterDefinition<Prompt>.Empty) > 0)
            {
                Console.WriteLine("Prompts already exist. Skipping seeding.");
                return;
            }

            var userCollection = database.GetCollection<User>("users");
            var categoryCollection = database.GetCollection<Category>("categories");
            var subCategoryCollection = database.GetCollection<SubCategory>("sub_categories");

            var user = userCollection.Find(u => u.Name == "Israel").FirstOrDefault();
            var category = categoryCollection.Find(c => c.Name == "Science").FirstOrDefault();
            var subCategory = subCategoryCollection.Find(s => s.Name == "Space").FirstOrDefault();

            if (user != null && category != null && subCategory != null)
            {
                var prompts = new List<Prompt>
            {
                new Prompt
                {
                    UserId = user.Id,
                    CategoryId = category.Id,
                    SubCategoryId = subCategory.Id,
                    PromptText = "What is a black hole?",
                    Response = "A black hole is a region of spacetime where gravity is so strong that nothing can escape from it.",
                    CreatedAt = DateTime.Now
                }
            };

                promptCollection.InsertMany(prompts);
                Console.WriteLine("Prompts seeded.");
            }
            else
            {
                Console.WriteLine("Could not find required user/category/subcategory for prompt seeding.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error seeding prompts: {ex.Message}");
            throw;
        }
    }


    private static void SeedCategories(IMongoDatabase database)
    {
        Console.WriteLine("Seeding categories...");
        try
        {
            var collection = database.GetCollection<Category>("categories");
            if (collection.CountDocuments(FilterDefinition<Category>.Empty) > 0)
            {
                Console.WriteLine("Categories already exist. Skipping seeding.");
                return;
            }

            var categories = new List<Category>
            {
                new Category { Name = "Science" },
                new Category { Name = "Mathematics" },
                new Category { Name = "History" }
            };

            collection.InsertMany(categories);
            Console.WriteLine("Categories seeded.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error seeding categories: {ex.Message}");
            throw;
        }
    }

    private static void SeedSubCategories(IMongoDatabase database)
    {
        Console.WriteLine("Seeding subcategories...");
        try
        {
            var categoryCollection = database.GetCollection<Category>("categories");
            var subCategoryCollection = database.GetCollection<SubCategory>("sub_categories");

            if (subCategoryCollection.CountDocuments(FilterDefinition<SubCategory>.Empty) > 0)
            {
                Console.WriteLine("Subcategories already exist. Skipping seeding.");
                return;
            }

            var science = categoryCollection.Find(c => c.Name == "Science").FirstOrDefault();
            var math = categoryCollection.Find(c => c.Name == "Mathematics").FirstOrDefault();
            var history = categoryCollection.Find(c => c.Name == "History").FirstOrDefault();

            var subCategories = new List<SubCategory>();

            if (science != null)
            {
                subCategories.Add(new SubCategory { Name = "Space", CategoryId = science.Id });
                subCategories.Add(new SubCategory { Name = "Biology", CategoryId = science.Id });
            }
            if (math != null)
            {
                subCategories.Add(new SubCategory { Name = "Algebra", CategoryId = math.Id });
                subCategories.Add(new SubCategory { Name = "Geometry", CategoryId = math.Id });
            }
            if (history != null)
            {
                subCategories.Add(new SubCategory { Name = "Ancient", CategoryId = history.Id });
                subCategories.Add(new SubCategory { Name = "Modern", CategoryId = history.Id });
            }

            if (subCategories.Count > 0)
            {
                subCategoryCollection.InsertMany(subCategories);
                Console.WriteLine("Subcategories seeded.");
            }
            else
            {
                Console.WriteLine("No subcategories to seed.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error seeding subcategories: {ex.Message}");
            throw;
        }
    }


    private static void SeedUsers(IMongoDatabase database)
    {
        Console.WriteLine("Seeding users...");
        try
        {
            var collection = database.GetCollection<User>("users");
            if (collection.CountDocuments(FilterDefinition<User>.Empty) > 0)
            {
                Console.WriteLine("Users already exist. Skipping seeding.");
                return;
            }

            var users = new List<User>
        {
            new User { CustomId = "123456789", Name = "Israel", Phone = "0501234567" },
            new User { CustomId = "111222333", Name = "Ada", Phone = "0507654321" }
        };

            collection.InsertMany(users);
            Console.WriteLine("Users seeded.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error seeding users: {ex.Message}");
            throw;
        }
    }

}



