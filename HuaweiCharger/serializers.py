from rest_framework import serializers
from .models import Charge, CurrentCharge


class ChargeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Charge
        fields = ('percentage', 'ip', 'datetime')


class CurrentChargeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CurrentCharge
        fields = ('percentage',)
