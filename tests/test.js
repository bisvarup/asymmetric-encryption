const encrypt = require("../index");
var { assert, expect } = require("chai");

describe("Asymmetric Encryption", () => {
  it("should encrypt and decrypt 'message'", () => {
    const message = "message";
    const { publicKey, privateKey } = encrypt.generateKeyPairSync();

    const enc = encrypt.encrypt(publicKey, message);
    const dec = encrypt.decrypt(privateKey, enc);

    assert.equal(message, dec);
  });

  it("encrypted message should not be equal to message", () => {
    const { publicKey } = encrypt.generateKeyPairSync();

    const message = "message";
    const enc = encrypt.encrypt(publicKey, message);
    expect(message).not.equal(enc);
  });

  it("private key should not equal public key", () => {
    const { publicKey, privateKey } = encrypt.generateKeyPairSync();

    expect(publicKey).not.equal(privateKey);
  });

  it("should throw error for really long messages", () => {
    const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a dui at libero accumsan finibus. Integer hendrerit elit a tellus sagittis, ac venenatis massa pulvinar. Mauris facilisis mattis mauris, ac posuere justo blandit eu. Ut aliquam luctus tortor vitae laoreet. Sed malesuada erat non odio efficitur, at maximus diam auctor. Morbi cursus fringilla lacus a hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse potenti. Vivamus tincidunt et quam nec elementum. Suspendisse at ullamcorper urna. Proin aliquam feugiat turpis, eu rutrum turpis cursus et.

    In facilisis semper diam ut sollicitudin. Nam imperdiet dignissim ligula, maximus rhoncus eros sodales sed. Mauris posuere mollis cursus. Integer in lectus tincidunt, viverra urna pellentesque, posuere felis. Nullam elementum sapien in nisi suscipit dictum. Curabitur pellentesque, tortor vitae rutrum maximus, enim nisl dictum tellus, ac vulputate tortor lorem id enim. Duis at dignissim ipsum, in consequat tellus. Curabitur massa urna, dapibus eu auctor pharetra, ultrices quis urna. Aliquam at tellus quis ex molestie pretium iaculis ac ex. Pellentesque rhoncus semper nibh, in bibendum lacus auctor eget. Nullam posuere nisl non mi porttitor ornare.
    
    Donec nisi elit, elementum ac viverra in, vestibulum id risus. Donec vitae tristique quam, non interdum elit. Integer rhoncus sollicitudin mauris, et tristique neque laoreet sit amet. Praesent semper, nunc ac blandit tempor, metus sapien luctus ex, a iaculis augue justo gravida libero. Nullam iaculis diam quis efficitur venenatis. Phasellus pellentesque lacus arcu, at feugiat mi posuere non. Aliquam a pretium metus, id posuere neque. Donec interdum sodales felis. Sed feugiat risus quis velit rhoncus feugiat. Ut a porta sapien.
    
    Aenean placerat urna dui, eget varius nulla efficitur ut. Curabitur molestie porta nisi non vehicula. Ut enim lorem, elementum non leo vitae, semper tristique dui. In et fringilla turpis, non viverra risus. Pellentesque enim magna, dictum a vulputate id, tristique efficitur massa. Ut interdum lobortis erat. Nam tempus ultrices finibus. Sed maximus dolor nec tellus congue pellentesque. Quisque blandit sagittis blandit. Maecenas sed eleifend justo. Mauris non elementum justo, quis volutpat turpis.
    
    Fusce dapibus neque et lacus facilisis consectetur sit amet sit amet ipsum. Proin quis fermentum metus. Integer nec efficitur neque. Nulla sed mi luctus nunc sollicitudin rhoncus quis quis est. Nullam scelerisque, diam ac tempus mollis, sapien eros mollis ligula, ut tristique sapien massa vitae lectus. Sed hendrerit in augue sit amet imperdiet. Morbi tempor egestas arcu, et condimentum nunc commodo eu. Proin a scelerisque ipsum, et sollicitudin purus. Mauris elementum diam ut dolor finibus scelerisque. Sed sit amet sapien non risus pretium commodo non in ligula. Nunc ac volutpat odio.
    
    Nam imperdiet, sem sed blandit bibendum, lacus massa mollis ex, ac maximus nulla nisl mollis enim. Donec fermentum leo ut erat mollis tincidunt. Maecenas imperdiet blandit turpis, eu faucibus ligula. Vivamus rutrum eros sem. Duis ac ex mollis, porta tellus at, egestas augue. Phasellus blandit volutpat neque, ut mollis diam laoreet finibus. Sed libero enim, ullamcorper ac erat ut, facilisis bibendum risus. Phasellus pulvinar feugiat arcu ut laoreet.
    
    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam in odio purus. Mauris convallis efficitur convallis. Proin malesuada risus tincidunt leo viverra, ac pharetra erat semper. Suspendisse eget justo aliquam, eleifend massa quis, commodo eros. Etiam vel dapibus lacus, eget placerat dui. Nam sit amet ligula metus. Nulla nec bibendum leo, eget sollicitudin magna. Proin pulvinar lacus vel vestibulum semper. Sed pretium quam ipsum, sit amet pharetra massa mollis a. Vivamus porttitor, arcu sed cursus vehicula, ligula arcu mattis ipsum, id maximus elit eros quis dolor. Mauris elementum nisi non nibh blandit lobortis. Vestibulum vitae erat et ligula accumsan tempor. In id lobortis diam. Sed laoreet sem nec lorem finibus, et mollis elit eleifend.
    
    Vivamus tincidunt diam vel ligula dapibus posuere. Sed dui nisi, scelerisque et ornare eu, euismod non metus. Aenean maximus libero a ex mattis, eget tempus orci dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non quam nec ante auctor lobortis. Etiam quis dapibus sem. Ut suscipit congue metus sit amet faucibus. Etiam convallis a nisl quis vulputate. Proin est ligula, tincidunt semper scelerisque euismod, egestas id magna.
    
    Praesent tincidunt, risus non tincidunt placerat, lectus nisi sagittis est, id elementum tortor enim ut nibh. In malesuada ipsum magna, eget accumsan urna dignissim nec. Vivamus faucibus vitae tortor quis volutpat. Morbi ac ante erat. Nam convallis dolor at dui varius congue. Morbi suscipit vulputate porta. Aenean non cursus ligula. Donec id quam consequat, interdum dolor eu, interdum leo. Vivamus ultrices rutrum magna eu interdum. Integer vitae leo sed massa sagittis molestie. Quisque eros dolor, ultricies varius ornare volutpat, fringilla quis mi. Suspendisse euismod, ipsum in aliquet placerat, diam massa porttitor tellus, accumsan porta enim metus ut magna. Nulla suscipit sit amet nunc ac dapibus. Proin rutrum sed eros non porta. Ut non porttitor nisl.
    
    Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras ac viverra metus. Etiam tincidunt, risus finibus ornare vulputate, nulla massa mollis arcu, eget eleifend ante eros eget neque. Nunc neque justo, venenatis iaculis magna in, faucibus facilisis nunc. Suspendisse at interdum erat, ac blandit justo. Nam ut sem ut nunc volutpat tincidunt vitae quis velit. Mauris hendrerit massa leo, vel convallis risus posuere et. Praesent rutrum ut ante quis rhoncus. Cras quam sapien, eleifend et finibus at, sagittis at lectus. Suspendisse in odio dui.
    
    Pellentesque scelerisque nunc felis, at bibendum orci volutpat pharetra. Donec viverra massa id urna rutrum, ut posuere velit condimentum. Sed magna magna, fermentum et est eu, commodo consequat magna. Proin at venenatis neque. Cras bibendum ultrices sem, eget hendrerit odio pretium at. Suspendisse eget lorem dui. Aliquam commodo ut nisl eget maximus. Nulla facilisi. Curabitur laoreet tempus mi eu venenatis.
    
    Fusce vestibulum congue turpis vel efficitur. Pellentesque sit amet porttitor turpis, non blandit libero. Cras ac lectus pulvinar, bibendum odio at, dapibus nibh. Cras ut dolor at sapien egestas viverra. Donec at fermentum augue, id pretium nisi. Nunc ipsum nisi, ornare et magna et, cursus lobortis est. Integer id fringilla orci. In mauris nisl, rutrum vel lectus ac, pellentesque placerat elit.
    
    In quis nunc vel nibh elementum convallis. Pellentesque suscipit iaculis ipsum, a dapibus tellus consequat sit amet. Aliquam placerat ac sapien vel posuere. Sed aliquet, lectus et varius posuere, arcu ante mollis nisl, a vestibulum quam felis sed est. Duis egestas in eros id luctus. Ut hendrerit suscipit maximus. Curabitur tristique quam non eleifend aliquam. Etiam efficitur rhoncus turpis, vel efficitur sem pellentesque imperdiet. Quisque finibus tortor non arcu vestibulum pharetra. Etiam interdum, est condimentum semper consectetur, metus eros mollis arcu, et bibendum nisi purus quis leo. Aliquam sed nisl fermentum, aliquam eros ut, pretium eros.
    
    Nunc tellus ipsum, auctor ac elit sed, aliquam cursus lectus. Maecenas volutpat sit amet mi in sagittis. Nunc fermentum eget tellus et ultricies. Aliquam nec purus sagittis, hendrerit risus sed, pellentesque sapien. Aenean varius felis eget sapien blandit tristique. Maecenas sodales magna euismod, blandit est sit amet, rutrum diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus laoreet eu risus ac vulputate. Maecenas sit amet velit et odio vestibulum tempus. Donec ac dignissim leo. Praesent vehicula vitae est vel faucibus. Ut ornare rutrum congue. In hac habitasse platea dictumst. Pellentesque purus augue, vehicula eu velit vitae, scelerisque elementum libero. Suspendisse facilisis ex vel quam eleifend, vehicula pulvinar sem interdum.
    
    Vivamus dictum eu elit sit amet pulvinar. Nullam finibus lectus quis est cursus viverra. Sed lacus dolor, porttitor a mi eget, egestas rhoncus mauris. In id lacinia nisi, id varius erat. Suspendisse arcu ipsum, molestie eget dictum a, fringilla a sem. Proin id enim vitae ante hendrerit pharetra non eu massa. Fusce pulvinar bibendum sapien, ut dignissim ligula convallis quis.
    
    Proin in magna id leo pulvinar tempus vel nec felis. Donec eu aliquet ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus bibendum arcu egestas, volutpat leo vel, venenatis ex. Sed rutrum mi et enim efficitur iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas vitae sollicitudin ex. Ut commodo massa quis justo placerat posuere. Aenean ac lorem orci. Praesent rutrum turpis ac nulla ullamcorper lobortis.
    
    Maecenas eget massa eu nunc porta eleifend ac in enim. Donec vel eros semper, posuere magna ut, fringilla libero. Sed vel lobortis magna. Sed posuere ante at tristique suscipit. Nullam dictum mollis lorem, sed pharetra lorem vulputate vitae. Maecenas ac diam id augue convallis consectetur. Etiam nec vehicula turpis, et congue erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras nisi magna, semper ac pulvinar nec, condimentum nec dolor. Mauris finibus porttitor maximus. Nunc consequat justo id ligula finibus, et varius ante tempor. Vivamus vulputate cursus purus, vel sagittis nunc varius ac. Phasellus nec eros eget velit volutpat porta.
    
    Vivamus rutrum, neque eu mollis finibus, nisi metus hendrerit risus, ac tempor tellus nunc vehicula ipsum. Nullam bibendum nec diam sit amet feugiat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque varius nunc quis nulla lacinia, quis tristique leo ultrices. Quisque finibus dolor et justo sagittis posuere. Phasellus auctor rutrum tristique. Phasellus pulvinar vehicula dictum. Etiam maximus imperdiet nisl, at eleifend lectus iaculis at.
    
    Proin vel massa lorem. Ut condimentum dignissim accumsan. Integer elementum porta nisi sed luctus. Donec iaculis neque sit amet libero elementum venenatis. Nam hendrerit urna sit amet tellus venenatis, eu sodales urna tristique. Mauris sit amet venenatis ante, nec congue velit. Aliquam erat volutpat. Donec ante lacus, sagittis vel pharetra a, egestas sed augue. Integer aliquam vel quam sit amet porta. Sed dui nulla, porta id metus vitae, dictum eleifend lectus. Quisque nec nisi aliquam, fermentum massa id, auctor quam.
    
    Quisque id ipsum scelerisque, faucibus lorem quis, consequat magna. Donec convallis gravida ligula in luctus. Proin et erat vehicula nisi condimentum ornare at sed ante. Vivamus non felis ac eros porta aliquet nec ac felis. Vivamus porttitor semper quam, at pharetra odio efficitur et. Vivamus sodales in tellus quis finibus. Aliquam sit amet leo sit amet dolor molestie auctor. Donec pretium odio id elit hendrerit, et mattis lacus lacinia. In tristique, dolor at pellentesque tincidunt, tortor augue sollicitudin arcu, finibus dignissim arcu tellus ut arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer a porta purus, nec aliquam risus. Nam id lectus enim.
    
    Donec sollicitudin tortor ut pretium posuere. Praesent a feugiat nunc. Aliquam ac justo sit amet ex placerat fringilla. Nulla quis maximus urna. Proin augue arcu, consequat et nisi ut, congue sagittis mi. Fusce a aliquam nunc. Sed sit amet eros nec nulla venenatis sodales eget a urna. Vestibulum pretium volutpat ipsum luctus suscipit. Quisque sapien odio, pulvinar nec quam sed, rhoncus accumsan ipsum. Quisque enim orci, auctor a ligula eu, volutpat iaculis quam. Praesent sit amet lorem sit amet massa viverra tempor.
    
    Proin in enim neque. Nulla placerat ante nisi, gravida iaculis ex efficitur posuere. Curabitur id lorem vehicula, facilisis justo vel, mollis nibh. Integer eu egestas diam, quis ullamcorper enim. Mauris vel venenatis ligula. Cras maximus lectus nec nulla faucibus feugiat. Phasellus condimentum eros quis enim porta rutrum. Nunc suscipit sem eu velit blandit, vel feugiat enim bibendum. Proin ut vulputate leo, ac viverra justo. Proin sodales tincidunt facilisis.
    
    Duis a quam varius, lacinia magna non, malesuada tellus. Curabitur et nibh magna. Etiam elit risus, venenatis quis pulvinar et, mollis eu diam. Vivamus sit amet eros libero. Ut sagittis ipsum et volutpat suscipit. Fusce eget enim eget libero suscipit maximus. Sed arcu diam, fermentum vestibulum consectetur sed, blandit sit amet nisi. Phasellus a feugiat nibh. Nam dolor enim, condimentum nec tempor eleifend, laoreet et dui. Sed tristique nibh non convallis auctor. Curabitur leo urna, vehicula at cursus et, vehicula tempor sem.
    
    Mauris rhoncus lobortis consequat. Curabitur luctus risus non felis vehicula porttitor. Quisque venenatis, nisl et laoreet elementum, massa dolor interdum tortor, sed mattis mi orci sit amet odio. In tortor ipsum, sollicitudin eu fringilla vel, pretium at arcu. Sed ut pharetra ante, sit amet posuere orci. Duis ultrices, ante viverra eleifend tristique, tellus odio molestie orci, eu dictum lectus quam a leo. Morbi luctus congue tortor, vitae dictum est pharetra non. Praesent rutrum ante accumsan nunc cursus posuere. Mauris malesuada lectus vitae ante luctus aliquet. Aenean eu tincidunt ante. Donec ex mi, fringilla sit amet ligula at, maximus vehicula ex. Donec ut vulputate ante. Praesent interdum turpis sed tellus congue sodales. Donec vitae magna ac justo mattis fermentum. Morbi mattis nisl quis fringilla consectetur. Sed aliquet facilisis tellus id luctus.
    
    Donec lacinia pellentesque bibendum. Nulla quis ornare metus, in dictum neque. Etiam sagittis euismod iaculis. Nam vulputate elit a porta tincidunt. Nunc egestas massa ut faucibus auctor. Morbi nec ante maximus, varius dolor ac, cursus augue. Fusce pretium hendrerit elit. Vivamus risus urna, ornare ac vulputate vitae, faucibus vitae risus. Mauris ullamcorper erat vitae leo tincidunt, a accumsan risus auctor. Vestibulum urna felis, consequat id orci vitae, egestas posuere metus. Donec ornare sem eu tristique tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer facilisis ultricies nisl, at bibendum arcu ornare eu.`;
    const { publicKey } = encrypt.generateKeyPairSync();

    expect(()=>encrypt.encrypt(publicKey, message)).to.throw(Error);
  });
});
