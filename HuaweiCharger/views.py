import datetime

from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Charge, CurrentCharge
from .serializers import ChargeSerializer


class Home(APIView):

    @staticmethod
    def get(request):
        current_charge = CurrentCharge.objects.get(pk=1)
        data = {'current_charge': current_charge.percentage}
        return render(request, '../templates/huawei-charger/home.html', data)


class Result(APIView):

    @staticmethod
    def get(request):
        charge_count = Charge.objects.all().count()
        data = {'charge_count': charge_count}
        return render(request, '../templates/huawei-charger/result.html', data)


class ChargeView(APIView):
    """
    A view that returns the count of charges in JSON.
    """

    @staticmethod
    def get(request):
        charge_count = Charge.objects.all().count()
        content = {'charge_count': charge_count}
        return Response(content)

    @staticmethod
    def post(request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')

        current_charge = CurrentCharge.objects.get(pk=1)
        current_charge.percentage += int(request.data['percentage'])

        if current_charge.percentage >= 100:
            current_charge.percentage -= 100

        charge = {'ip': ip, 'percentage': request.data['percentage'], 'datetime': datetime.datetime.now()}

        charge_serializer = ChargeSerializer(data=charge)

        if charge_serializer.is_valid():
            current_charge.save()
            charge_serializer.save()

            charge_count = Charge.objects.all().count()
            content = {'charge_count': charge_count, 'current_charge': current_charge.percentage}
            return Response(content, status=status.HTTP_201_CREATED)
        else:
            return Response(charge_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
