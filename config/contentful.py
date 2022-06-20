import contentful


ACCESS_TOKEN = 'CDAiTXyDDWZTNJvWpCyz0Vo9zAHkod_GDd23kjXSuFU'
SPACE_ID = 'mallesr19g2u'

client = contentful.Client(SPACE_ID, ACCESS_TOKEN)


def get_entries(data_type):
    return client.entries({'content_type': data_type})


def get_entry(entry_id):
    return client.entry(entry_id)
    