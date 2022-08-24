import json, random

random.seed(3)

l = range(3041)
l = list(l)
random.shuffle(l)
print(l)

json_str = json.dumps(l)
file = open('order.json',mode='w')
file.write(json_str)
file.close()