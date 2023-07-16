import re

from rest_framework import serializers


def file_to_transactions(str_content_file=''):
    def get_value(start, end, str_regex):
        value = line[start:end]
        if not re.match(str_regex, value):
            raise serializers.ValidationError(f'The value [{value}] does not match the specified')
        return value.strip()

    content_list = str_content_file.strip().split('\n')
    if not content_list:
        raise serializers.ValidationError('Empty content')
    transformed_transactions = []
    for line in content_list:
        line = line.strip()
        if not line or len(line) > 86:
            raise serializers.ValidationError(f'Unable to convert line [{line}]')
        transformed_transactions.append(
            {
                'type': get_value(0, 1, r'^\d$'),
                'date': get_value(1, 26, r'^\d{4}(-\d{2}){2}T\d{2}(:\d{2}){2}-\d{2}:\d{2}$'),
                'product': get_value(26, 56, r'^[a-zA-Z]+.*$'),
                'value': get_value(56, 66, r'^\d+$'),
                'vendor': get_value(66, 86, r'^[a-zA-Z]+.*$')
            }
        )
    return transformed_transactions
