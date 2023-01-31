import uuid
import string
import random

DEFAULT_CHAR_STRING = string.ascii_lowercase + string.digits

def generate_uuid(long = 15):
    string = ""
    for i in str(uuid.uuid4())[:long].split("-"):
        string += i

    return string

def generate_random_string(chars = DEFAULT_CHAR_STRING, size = 6):
    return ''.join(random.choice(chars) for _ in range(size))