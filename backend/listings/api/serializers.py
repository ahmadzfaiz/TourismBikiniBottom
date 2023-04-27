from rest_framework import serializers
from listings.models import Listing

class ListingSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    seller_username = serializers.SerializerMethodField()
    
    def get_country(self, obj):
        return 'England'
    
    def get_seller_username(self, obj):
        return obj.seller.username
    
    class Meta:
        model = Listing
        fields = '__all__'
