
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const featuredItems = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    category: 'Jackets',
    size: 'M',
    condition: 'Good',
    points: 25,
    image: 'https://images.unsplash.com/photo-1544966503-7cc4ac7b4ae5?w=300&h=400&fit=crop',
    user: 'Sarah M.',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    category: 'Dresses',
    size: 'S',
    condition: 'Excellent',
    points: 30,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
    user: 'Emma K.',
    rating: 5.0
  },
  {
    id: '3',
    title: 'Designer Handbag',
    category: 'Accessories',
    size: 'One Size',
    condition: 'Like New',
    points: 45,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop',
    user: 'Lisa R.',
    rating: 4.9
  },
  {
    id: '4',
    title: 'Cashmere Sweater',
    category: 'Sweaters',
    size: 'L',
    condition: 'Good',
    points: 35,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop',
    user: 'Maya T.',
    rating: 4.7
  }
];

const FeaturedItems = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Items
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover amazing pieces from our community. Each item has been carefully listed 
            and is ready for its next adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {featuredItems.map((item) => (
            <Link key={item.id} to={`/item/${item.id}`} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-700">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Heart className="h-5 w-5 text-white/80 hover:text-red-500 cursor-pointer" />
                  </div>
                  <Badge 
                    className="absolute top-3 left-3 bg-emerald-600 hover:bg-emerald-600 dark:bg-emerald-500"
                  >
                    {item.points} pts
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span>{item.category}</span>
                    <span>Size {item.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                      {item.condition}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Listed by {item.user}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
          >
            View All Items →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
