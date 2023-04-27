from pyexpat import model
from django import forms
from .models import Listing
from django.contrib.gis.geos import Point

class ListingsForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = [
            'title',
            'seller',
            'description',
            'area',
            'borough',
            'listing_type',
            'property_status',
            'price',
            'rental_frequency',
            'rooms',
            'furnished',
            'pool',
            'elevator',
            'cctv',
            'parking',
            'location',
            'latitude', # not based on model, for location input
            'longitude', # not based on model, for location input
            'picture1',
            'picture2',
            'picture3',
            'picture4',
            'picture5',
        ]

    latitude = forms.FloatField()
    longitude = forms.FloatField()

    def clean(self):
        data = super().clean()
        latitude = data.pop('latitude')
        longitude = data.pop('longitude')
        data['location'] = Point(longitude, latitude, srid=4326)
        return data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        location = self.initial.get('location')
        if isinstance(location, Point):
            self.initial['longitude'] = location.tuple[0]
            self.initial['latitude'] = location.tuple[1]