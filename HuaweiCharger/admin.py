from django.contrib import admin
from .models import Charge, ChargeAdmin, CurrentCharge, CurrentChargeAdmin


# Register your models here.
admin.site.register(Charge, ChargeAdmin)
admin.site.register(CurrentCharge, CurrentChargeAdmin)
