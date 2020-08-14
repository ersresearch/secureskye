from datetime import date
from glob import glob
from itertools import chain
from os import devnull, mkdir, remove
from os.path import exists, isfile
from shutil import copy, copytree, rmtree
from subprocess import call

REL_MAJOR = 0
REL_MINOR = 4
REL_PATCH = 0
RELEASE_TAG = '{0}.{1}.{2}.RELEASE'.format(REL_MAJOR, REL_MINOR, REL_PATCH)
RELEASE_DATE = date(2017, 12, 27).strftime('%Y%m%d')

MODULES = {
    'gateway': 'gateway',
    'ixs-main': 'ixs/main',
    'ie-main': 'ie/main',
    'oauth2': 'oauth2',
    'ota-vehicle': 'ota/vehicle',
    'ui': 'ui',
    'vehicle-admin': 'vehicle/admin',
    'vehicle-message': 'vehicle/message',
    'user-admin': 'user/admin'
}

FNULL = open(devnull, 'w')

# Run build
# ----------
print('Running gradle build...')

#res = call(['./gradlew', 'clean', 'assemble', 'buildDocker'], stdout=FNULL)
#if res != 0:
#    print('Error running gradle!')
#    exit(res)

# Remove pre-existing files and folders
# ----------
print('Cleaning up...')

if exists('release'):
    rmtree('release')

if isfile('secureskye-' + RELEASE_TAG + '.7z'):
    remove('secureskye-' + RELEASE_TAG + '.7z')

# Generate instructions
# ----------
print('Generating readme...')
mkdir('release')
res = call(['asciidoctor', '-o', 'release/README.html', 'docs/RELEASE.adoc'], stdout=FNULL)
if res != 0:
    print('Error creating readme!')
    exit(res)

# Copy jar files
# ----------
print('Copying jar files...')
jarList = list(chain.from_iterable(
    [glob(outDir + '/build/libs/*.jar') for (mod, outDir) in MODULES.items()]
))

mkdir('release/jars')
for jar in jarList:
    copy(jar, 'release/jars/')

# Copy docker images
# ----------
print('Copying Docker images...')
mkdir('release/docker')

for (mod, outDir) in MODULES.items():
    res = call(['docker', 'image', 'save',
                '10.0.0.7/secureskye/secureskye/{0}:{1}'.format(mod, RELEASE_TAG),
                '-o', 'release/docker/{0}-{1}.tar'.format(mod, RELEASE_TAG)], stdout=FNULL)
    if res != 0:
        print('Error copying Docker images!')
        exit(res)

# Copy docker compose files
# ----------
print('Copying Docker Compose files...')
copytree('compose/', 'release/compose/')

# Zip everything into an archive
# ----------
print('Creating archive...')
passw = 'tss-{0}-{1}-{2}-rel-{3}'.format(REL_MAJOR, REL_MINOR, REL_PATCH, RELEASE_DATE)
res = call(['7za', 'a', '-m0=lzma2', '-mx9', '-mmt0', '-mhe=on',
            '-p{0}'.format(passw),
            'secureskye-{0}.7z'.format(RELEASE_TAG),
            './release/*'], stdout=FNULL)
if res != 0:
    print('Error creating archive!')
    exit(res)

print('Archive password is: ' + passw)

# Cleanup
# ----------
print('Cleaning up ...')
rmtree('release')

print('Finished!')
