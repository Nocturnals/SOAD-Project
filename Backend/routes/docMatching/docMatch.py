import os
import re
import copy
from nltk.corpus import wordnet


with open(os.path.abspath(__file__), 'r', encoding='utf-8') as file:
    commanwords = file.read()
    commanwords = commanwords.split()


def replaceMultiple(mainString, toBeReplaces, newString):
    for elem in toBeReplaces:
        if elem in mainString:
            mainString = mainString.replace(elem, newString)

    return mainString


def Textfiler(text1, text2):
    text1 = replaceMultiple(text1, ["'", ',', '?', '"'], "")
    text2 = replaceMultiple(text2, ["'", ',', '?', '"'], "")
    text1 = text1.replace("\n", " ")
    text2 = text2.replace("\n", " ")
    return text1, text2


def Remove(duplicate):
    final_list = []
    for num in duplicate:
        if num not in final_list:
            final_list.append(num)
    return final_list


def getSynonyms(words):

    all_syns = []
    for name in words:
        syn_names = [name]

        for syn in wordnet.synsets(name):
            for syns in syn.lemma_names():
                syn_names.append(syns)

        all_syns.append(Remove(syn_names))
    return all_syns


def plagiarism(text1, text2):
    text1, text2 = Textfiler(text1, text2)
    sentense1 = text1.split('.')
    sentense2 = text2.split('.')
    print(sentense1, sentense2)
    print("\n\n")

    sentense1 = [i for i in sentense1 if (i)]
    sentense2 = [i for i in sentense2 if (i)]

    VP_percentage = verbatimPlagiarism(sentense1, sentense2)
    Pp_percentage = paraphrasingPlagiarism(sentense1, sentense2)
    print(VP_percentage, Pp_percentage)
    return VP_percentage, Pp_percentage
    pass


def verbatimPlagiarism(sentense1, sentense2):
    Ouccred = 0
    i, j = 0, 0
    sentDict = []

    while(i < len(sentense1)):
        counter = 0
        while(True):
            counter += 1
            if(counter > len(sentense2)):
                break
            if(sentense1[i] == sentense2[j % (len(sentense2))-1]):
                Ouccred += 1
                # i+=1

                # print([sentense1[i], sentense2[j % (len(sentense2))-1]])
                sentDict.append([i, j % (len(sentense2))-1])
                j += 1

                break
            else:
                j += 1
                continue
        i += 1

    return Ouccred/len(sentense2), sentDict
    pass


def paraphrasingPlagiarism(sentenses1, sentenses2):

    Ouccred = 0
    i, j = 0, 0
    sentDict = []

    while(i < len(sentenses1)):
        counter = 0
        while(True):
            counter += 1
            if(counter > len(sentenses2)):
                break

            if(compare(sentenses1[i], sentenses2[j % (len(sentenses2))-1]) > 0.66):
                Ouccred += 1
                # i+=1
                sentDict.append([i, j % (len(sentenses2))-1])
                j += 1

                break
            else:
                j += 1
                continue
        i += 1

    return Ouccred/len(sentenses2), sentDict
    pass


def compare(sentense1, sentense2):
    sentense1 = sentense1.split()
    sentense2 = sentense2.split()
    temp = []
    for i in sentense1:
        if i not in commanwords:
            temp.append(i.lower())
    sentense1 = temp
    temp = []
    for i in sentense2:
        if i not in commanwords:
            temp.append(i.lower())
    sentense2 = temp

    # print([sentense1, sentense2])

    if(len(sentense1) > len(sentense2)):
        sentense2_syns = getSynonyms(sentense2)
        oucrred = 0
        for word in sentense1:
            for syns in sentense2_syns:
                if(word in syns):
                    oucrred += 1
        # print(oucrred/len(sentense1))
        return oucrred/len(sentense1)
    else:
        sentense1_syns = getSynonyms(sentense1)
        oucrred = 0
        for word in sentense2:
            for syns in sentense1_syns:
                if(word in syns):
                    oucrred += 1
        # print(oucrred/len(sentense2))
        return oucrred/len(sentense2)

    pass


if __name__ == "__main__":

    text1 = " The wedding planner is making all the reservations. "
    text2 = "All the reservations are being made by the wedding planner."
    plagiarism(text1, text2)
    pass
