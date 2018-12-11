from django.contrib import admin
from django.db import models


# create your models here.
class Charge(models.Model):
    PERCENTAGE_VALUES = (
        (5, '5%'),
        (10, '10%'),
        (25, '25%'),
        (50, '50%'),
    )
    percentage = models.IntegerField(choices=PERCENTAGE_VALUES)
    ip = models.GenericIPAddressField()
    datetime = models.DateTimeField()

    class Meta:
        ordering = ["datetime"]
        verbose_name = "Charge"
        verbose_name_plural = "Charges"


class ChargeAdmin(admin.ModelAdmin):
    list_display = ['percentage', 'ip', 'datetime']
    list_filter = ('percentage', 'datetime')


class CurrentCharge(models.Model):
    PERCENTAGE_VALUES = (
        (0, '0%'),
        (5, '5%'),
        (10, '10%'),
        (15, '15%'),
        (20, '20%'),
        (25, '25%'),
        (30, '30%'),
        (35, '35%'),
        (40, '40%'),
        (45, '45%'),
        (50, '50%'),
        (55, '55%'),
        (60, '60%'),
        (65, '65%'),
        (70, '70%'),
        (75, '75%'),
        (80, '80%'),
        (85, '85%'),
        (90, '90%'),
        (95, '95%'),
        (100, '100%'),
    )
    percentage = models.IntegerField(choices=PERCENTAGE_VALUES, default=0)


class CurrentChargeAdmin(admin.ModelAdmin):
    list_display = ['percentage']

    class Meta:
        verbose_name = "Current Charge"
        verbose_name_plural = "Current Charge"

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

