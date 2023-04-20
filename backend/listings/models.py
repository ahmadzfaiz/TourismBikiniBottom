from django.contrib.gis.db import models

class Listing(models.Model):
  choices_area = [
    ('Inner London', 'Inner London'),
    ('Outer London', 'Outer London'),
  ]

  choices_listing_type = [
    ('House', 'House'),
    ('Apartment', 'Apartment'),
    ('Office', 'Office'),
  ]

  choices_property_status = [
    ('Sale', 'Sale'),
    ('Rent', 'Rent'),
  ]

  choices_rental_frequency = [
    ('Month', 'Month'),
    ('Week', 'Week'),
    ('Day', 'Day'),
  ]

  title = models.CharField(max_length=150)
  description =  models.TextField(null=True, blank=True)
  area = models.CharField(max_length=20, null=True, blank=True, choices=choices_area)
  borough = models.CharField(max_length=50, null=True, blank=True)
  listing_type = models.CharField(max_length=20, choices=choices_listing_type)
  property_status = models.CharField(max_length=20, null=True, blank=True, choices=choices_property_status)
  price = models.DecimalField(max_digits=50, decimal_places=0)
  rental_frequency = models.CharField(max_length=20, null=True, blank=True, choices=choices_rental_frequency)
  rooms = models.IntegerField(null=True, blank=True)
  furnished = models.BooleanField(default=False)
  pool = models.BooleanField(default=False)
  elevator = models.BooleanField(default=False)
  cctv = models.BooleanField(default=False)
  parking = models.BooleanField(default=False)
  date_posted = models.DateTimeField(auto_now=True)
  location = models.PointField(null=True, blank=True)
  picture1 = models.ImageField(null=True, blank=True, upload_to='pictures/%Y-%m-%d/')
  picture2 = models.ImageField(null=True, blank=True, upload_to='pictures/%Y-%m-%d/')
  picture3 = models.ImageField(null=True, blank=True, upload_to='pictures/%Y-%m-%d/')
  picture4 = models.ImageField(null=True, blank=True, upload_to='pictures/%Y-%m-%d/')
  picture5 = models.ImageField(null=True, blank=True, upload_to='pictures/%Y-%m-%d/')

  def __str__(self):
    return self.title