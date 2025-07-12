
import { useAuth } from "@/contexts/AuthContext";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Share2, Star, MessageCircle, Shield, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

// Mock data - in real app, this would come from API
const mockItem = {
  id: '1',
  title: 'Vintage Denim Jacket',
  description: 'Beautiful vintage denim jacket in excellent condition. This classic piece has been well-maintained and features original hardware. Perfect for layering and adds a timeless touch to any outfit. Slight fading gives it authentic vintage character.',
  category: 'Jackets',
  type: 'Denim Jacket',
  size: 'M',
  condition: 'Good',
  points: 25,
  images: [
    'https://images.unsplash.com/photo-1544966503-7cc4ac7b4ae5?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop'
  ],
  user: {
    name: 'Sarah M.',
    rating: 4.8,
    totalSwaps: 23,
    joinedDate: '2023-01-15'
  },
  tags: ['vintage', 'denim', 'casual', 'unisex'],
  status: 'available',
  listedDate: '2024-01-10'
};

const ItemDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleSwapRequest = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to request a swap');
      return;
    }
    toast.success('Swap request sent! Sarah M. will be notified.');
  };

  const handleRedeemWithPoints = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to redeem with points');
      return;
    }
    if (!user || user.points < mockItem.points) {
      toast.error(`You need ${mockItem.points} points to redeem this item`);
      return;
    }
    toast.success('Item redeemed successfully! Check your dashboard for shipping details.');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Browse
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="relative">
              <img 
                src={mockItem.images[currentImageIndex]} 
                alt={mockItem.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={handleLike}
                  className={`${isLiked ? 'bg-red-100 text-red-600' : ''}`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="secondary" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            {mockItem.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {mockItem.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${mockItem.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {mockItem.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{mockItem.category} • {mockItem.type}</span>
                  <span>Size {mockItem.size}</span>
                </div>
              </div>
              <Badge className="bg-emerald-600 hover:bg-emerald-600 text-lg px-3 py-1">
                {mockItem.points} pts
              </Badge>
            </div>

            {/* Condition and Status */}
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="outline" className="text-sm">
                {mockItem.condition}
              </Badge>
              <Badge 
                variant="secondary" 
                className={`${mockItem.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                {mockItem.status === 'available' ? 'Available' : 'Not Available'}
              </Badge>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {mockItem.description}
              </p>
            </div>

            {/* Tags */}
            {mockItem.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {mockItem.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Owner Info */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {mockItem.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{mockItem.user.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{mockItem.user.rating}</span>
                      </div>
                      <span>{mockItem.user.totalSwaps} swaps</span>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-green-600" />
                        <span className="text-green-600">Verified</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {mockItem.status === 'available' && (
              <div className="space-y-3">
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-3"
                  onClick={handleSwapRequest}
                >
                  Request Swap
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg py-3"
                  onClick={handleRedeemWithPoints}
                  disabled={!user || user.points < mockItem.points}
                >
                  Redeem with {mockItem.points} Points
                  {user && user.points < mockItem.points && (
                    <span className="ml-2 text-xs text-red-500">
                      (Need {mockItem.points - user.points} more)
                    </span>
                  )}
                </Button>
                
                {!isAuthenticated && (
                  <p className="text-sm text-gray-500 text-center">
                    <Link to="/login" className="text-emerald-600 hover:text-emerald-700">
                      Log in
                    </Link> to swap or redeem this item
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
